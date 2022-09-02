package be;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@EnableJpaAuditing //audit 설정에 필요한 에너테이션
@SpringBootApplication
public class BeApplication {

	public static void main(String[] args) {
		SpringApplication.run(BeApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**").allowedOrigins("http://13.209.17.182:8080",
						"http://localhost:8080", "http://localhost:3000",
						"https://localhost:3000")
						.allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH");
			}
		};
	}
}
